專題四：高效嵌入式序列建模 Mamba 在 Jetson 平台的加速實作

摘要與研究成果
目標深入探索新型態序列模型 Mamba，並將其部署於 NVIDIA Jetson 嵌入式平台進行優化。研究內容首先解析了 Mamba 模型以選擇性狀態壓縮達成線性時間複雜度的核心理論。接著，專案克服了平台架構差異，成功將 Mamba 從 x86 平台移植至 ARM 架構的 Jetson 平台，並透過重新編譯底層 CUDA 核心，實現了相較於同等規模 Transformer 模型 四倍 的推論速度提升。為進一步挑戰性能極限，引入 Chebyshev 多項式改寫其核心運算，並打造客製化 CUDA 核心，再度將推論速度提升 兩倍。此專案完整地展現了從模型理論分析、跨平台編譯、底層 CUDA 核心開發到硬體加速的綜合實作能力。

1. Mamba 模型：
   Mamba [1] 作為一種新興的狀態空間模型 (State Space Model, SSM)，其厲害之處在於處理長序列資料時，能同時兼顧高效能與低記憶體佔用。傳統 Transformer 模型在處理序列時，其自註意力機制的計算複雜度為 O\left(n^2\right)，這在序列長度 n\ 增加時會導致運算量與記憶體需求急劇上升。
   Mamba 透過將序列資訊壓縮成一個固定維度的「狀態向量」，成功將運算複雜度降至線性的 O(n)。此設計不僅大幅提升了模型在長序列任務上的效能與可擴展性，更使其在邊緣運算等資源受限的場景中具備巨大潛力。
   這一優勢的核心來自於 透過 HIPPO (High-order Polynomial Projection Operators) 壓縮與 Mamba 本質上具備類似 RNN 的「逐步更新」特性，可以線性掃描序列，而不必像 Transformer 那樣計算全域 pairwise 關係。HIPPO 將連續的歷史輸入流 u(t)，透過數學投影壓縮成一個固定維度的狀態向量 x(t)。其核心可用以下狀態空間方程表示：
   x\prime(t)=Ax(t)+Bu(t)
   y(t)=Cx(t)+Du(t)
   其中，A,B,C,D 為可學習的參數矩陣。此機制能夠動態地更新模型狀態，策略性地保留近期重要資訊並捨棄舊有或較不相關的輸入，從而實現對長序列的高效記憶管理。
   ![alt text](image-7.png)
   圖 1. HiPPO 示意圖（來源於網路）
   從圖 2 中的長條圖顯示，在接近同樣的模型參數下，無論是訓練時間、訓練記憶體，還是推論延遲與推論記憶體，Mamba（綠色長條）均遠優於 Transformer（橘色長條）。尤其在推論性能上，Mamba 分別取得了 15 倍的延遲降低 與 14 倍的記憶體節省。這驗證了 Mamba 架構的優越性。
   ![alt text](image-6.png)
   圖 2. Mamba vs. Transformer 比較圖
   Jetson 平台部署與實驗結果
   為驗證 Mamba 模型在邊緣運算設備上的應用潛力，選擇將其部署到 NVIDIA Jetson 這類 ARM 架構的嵌入式平台。由於 Mamba 官方實現中包含了針對 x86 架構 GPU 高度客製化的 CUDA 運算核心，這些核心無法直接在 ARM 架構的 Jetson 上編譯運行。
   為解決此問題，專案採取了以下跨平台部署流程：

1. 建立自訂 CUDA 擴展：使用 PyTorch 提供的 torch.utils.cpp_extension 與 setuptools 工具鏈，建立自訂的 CUDA 擴展模組。此方法可將核心運算邏輯從 C++/CUDA 原始碼編譯成 Python 可直接調用的動態連結庫。 2.針對性編譯：在編譯指令中，指定目標 GPU 架構為 Jetson 所使用的\ compute_87，確保產生的機器碼能夠在目標設備上高效運行。
1. 提升編譯效率：導入 Ninja 編譯框架並啟用多核心 CPU 並行編譯，大幅縮短客製化 CUDA 核心的編譯時間。
   經過上述流程，成功將 Mamba 模型整合至 Python 環境中。部署測試結果顯示，在同樣 12 層模型結構下，Mamba 在 Jetson 平台上的推論速度達到了同等規模 Transformer 模型的 約四倍，充分展示了其在邊緣 AI 應用中的巨大潛力。
   ![alt text](image-5.png)
   圖 3. Mamba vs. Transformer 推論比較圖
   Chebyshev 多項式 CUDA 核心優化
   為了進一步挖掘 Mamba 在推論上的性能極限，專案嘗試使用 Chebyshev 多項式來近似改寫其核心遞迴運算，並親自設計了一個客製化的 CUDA 核心 CUDA-ChebyshevMambaBlock。
   Chebyshev 多項式具有優良的數值穩定性與遞迴特性，其核心遞迴公式為：
   T*0\left(x\right)=1,
   T_1\left(x\right)=x,
   T*{n+1}\left(x\right)=2xT*n\left(x\right)-T*{n-1}\left(x\right)

1. CUDA Kernel 開發：使用 CUDA C++ 撰寫核心運算 (kernel)，將上述遞迴公式改寫為適合 GPU 大規模並行的架構，使 GPU 中的每一個核心能同時處理張量中的一個元素。
1. C++/PyTorch 橋接：透過 C++ Wrapper 與 pybind11 函式庫建立橋樑，將底層的 CUDA 程式碼封裝成可供 PyTorch 張量（Tensor）直接呼叫的介面。
1. 編譯為 Python 模組：利用 PyTorch 的編譯工具鏈，將所有 C++/CUDA 程式碼打包成一個 Python 模組，讓上層模型能像調用一般函式庫一樣，直接呼叫此 GPU 加速運算。
   實驗結果顯示，經過 Chebyshev 優化的 CUDA-ChebyshevMambaBlock\ 版本，其推論速度比原生的 GPU CUDA Mamba 版本快上兩倍。
   ![alt text](image-4.png)
   圖 4. 不同核心推論速度比較圖
   在測試中也發現，當模型遞迴階層數較少（如 3 層）時，分別取第一層熱力圖的 Chebyshev 近似輸出的熱力圖分布較為集中，沒有像 Self-attention 熱力圖的平均。為改善此現象，專案將遞迴深度提升至 8 層，並結合多頭（Multi-head）機制，其輸出特徵的集中度有了一定改善。

圖 5：Self-attention（左） 與 Chebyshev（右）
![alt text](image-3.png)
圖 6. Self-attention 多頭比較圖
![alt text](image-1.png)
圖 7. Chebyshev 多頭比較圖

![alt text](image-2.png)
結論
儘管此優化在推論速度上取得顯著成功，但在驗證反向傳播（training）誤差還是太大，經過多次嘗試仍未能完全解決，也了解直接去看熱力圖 也不是好方法。儘管如此，這個過程讓我對 Mamba 論文的理論機制、CUDA 編譯流程與核心運算優化技巧有了更深刻的掌握。這些經驗為我未來將 AI 技術應用於 資安領域的即時辨識 (real-time detection) 打下基礎，並為研究所階段的進一步探索做好準備。 5. 參考文獻
A. Gu and T. Dao, “Mamba: Linear-time Sequence Modeling with Selective State Spaces,” arXiv preprint arXiv:2312.00752, v.2, 2024

專題五：Chebyshev 多項式近似與邊緣加速研究
摘要與研究成果
本研究提出將 Chebyshev 多項式近似應用於自注意力，以降低 Vision Transformer 在長序列與資源受限平台上的計算與記憶體成本。同時將其與 Mamba 模型及客製化 CUDA 核心結合，進一步提升邊緣設備效能。在 NVIDIA Jetson Nano 上以 CIFAR-10 驗證結果顯示：單純 Chebyshev Transformer 在小型模型中達成超過兩倍的訓練與推論加速，精度僅略有下降；結合 Mamba 架構與 CUDA 優化後，前向傳播速度提升 4–6 倍，記憶體使用與延遲顯著降低，準確率亦高於基線 Transformer。實驗證明，數學近似與高效模型設計相結合，可在邊緣平台上實現高效深度學習，為資源受限環境中的 Transformer 加速提供可行方案。
研究動機
Vision Transformer (ViT) 在電腦視覺中表現優異，但其自注意力機制中 Query 與 Key 的矩陣乘法導致計算量和記憶體需求隨序列長度平方增長，限制了在資源受限平台（如自動駕駛、無人機、移動裝置）上的部署。為降低複雜度，現有方法多採用稀疏注意力或低秩分解。研究探索另一途徑：利用高效數值逼近替代點積運算，繞過大規模矩陣乘法。提出用 Chebyshev 多項式近似注意力權重，期望在保留模型效能的同時顯著降低計算成本。專案目標包括：設計 Chebyshev 自注意力模組、在 Jetson Nano 上量化其性能增益，以及分析對不同模型規模的訓練穩定性與精度影響。
現有加速技術分析
FlashAttention（硬體優化）
FlashAttention [1] 透過「IO-Aware」設計，利用 GPU 片上記憶體分塊計算注意力矩陣，保持精確計算不失真。GPT-2 實驗顯示，訓練速度可提升 3 倍，長序列情況下仍比 Megatron-LM 快 30%，FLOPs 利用率達 50–73%。它展示了硬體感知優化在加速 Transformer 上的巨大潛力。
2.2 稀疏注意力（近似方法）
只計算重要 Query-Key 對，提升效率。以 SemSA 為例 [2]，注意力層加速 15.5 倍，端到端加速 3.79 倍，精度損失極小。
2.3 採用方法：Chebyshev 自注意力機制
標準自注意力的核心是計算一個注意力分數矩陣 A=\mathrm{softmax}\left(\frac{QK^T}{\sqrt{d*k}}\right)。此實驗的核心思想是繞過 (QK^T) 這一步，直接用 Chebyshev 多項式 (T_n\left(x\right)) 來構造注意力權重。
Chebyshev 多項式以其遞迴定義而聞名：
T_0\left(x\right)=1,
T_1\left(x\right)=x,
T*{n+1}\left(x\right)=2xT*n\left(x\right)-T*{n-1}\left(x\right)
這種遞迴性質使其非常適合在 GPU 上進行高效的並行計算。的實作將注意力權重的計算，從單一的大規模矩陣乘法，轉化為一系列可並行的、基於元素的操作，從而達到加速的目的。其中，多項式的階數 r 成為一個新的超參數，用以平衡逼近的精度與計算成本。 3. 實驗設計
所有實驗都在 NVIDIA Jetson Nano 8GB 與 CIFAR-10 數據集上，並且 Chebyshev 遞回深度都是設定 8 層（r=8）。由於記憶體受限，選擇 CIFAR-10 作為測試資料。研究核心在於比較自注意力機制 與 Mamba 模型 在邊緣設備上的效能，並驗證 客製化 CUDA 核心 的加速效果。
符號 模型全名
\mathbit{CM}-\mathbit{CUDA} Chebyshev MambaBlock on CUDA
\mathbit{M}-\mathbit{CUDA} MambaBlock on CUDA
\mathbit{M}-\mathbit{CPU} MambaBlock on CPU
\mathbit{CSA} Chebyshev Self-Attention
\mathbit{BSA} Basic Self-Attention
\mathbit{C}-\mathbit{Trans} Chebyshev Transformer
\mathbit{O}-\mathbit{Trans} Original Transformer (baseline)
\mathbit{B} 批次大小
\mathbit{L} 序列長度
\mathbit{d}\_\mathbit{model} 模型維度
表 1：模型符號
實驗一：基於 Chebyshev 的自註意力機制優化
首先，在單頭注意力 Vision Transformer 模型上進行了初步驗證。透模型損失與準確率實驗證明，引入 Chebyshev 近似的自注意力架構（Chebyshev Self-Attention）是可以收斂的。
![alt text](image-9.png)
圖 1：模型準確率比較圖
![alt text](image-8.png)
圖 1：模型損失比較圖
指標 \mathbit{CSA}\ \mathbit{BSA}
Accuracy (%) 83.48 86.38
Total Train Time (s) 4387.34 4568.60
Avg Epoch Time (s) 146.24 152.29
Inference Time (s) 2.79 3.04
表 2：CIFAR-10 性能數據表
實驗二：Mamba 部署與核心加速
實驗一驗證了優化思路的可行性後，將重心轉向 Mamba 模型。
4.1. 端對端模型性能比較
首先，在 Jetson Nano 上直接對比了 Mamba 與 Vision Transformer 在 CIFAR-10 任務上的整體性能。
指標 M-CUDA O-Trans
Train Time (s) 58.29 260.68
Train Mem (MB) 67.0 348.9
Infer Latency (ms) 7.61 25.45
Infer Mem (MB) 65.0 283.0
Best Test Acc (%) 76.83 42.83
表 3：Mamba 與 Vision Transformer 性能對比
Mamba 在邊緣設備上的表現全面勝出。相較於 Transformer，Mamba 的訓練時間縮短了 4.5 倍，訓練記憶體消耗減少 5.2 倍，推論延遲降低 3.3 倍，推論記憶體消耗減少 4.4 倍，且模型準確率更高。這強烈地證明了 Mamba 作為邊緣 AI 應用的卓越性。
4.2. Chebyshev CUDA 核心優化
為了進一步壓榨 Mamba 的性能，為其設計了客製化的 \mathbit{M}-\mathbit{CUDA}，並對其前向傳播（Forward Pass）性能進行了精確的微觀基準測試。

模型 Avg Time (ms) Memory (MB)

\mathbit{B},\ \mathbit{L},\ \mathbit{d}_\mathbit{model}\ 為 (32, 128, 64)
\mathbit{CM}-\mathbit{CUDA} 5.20★ 37.5★
\mathbit{M}-\mathbit{CUDA} 25.30 30.6
\mathbit{M}-\mathbit{CPU} 32.82 351.8
\mathbit{B},\ \mathbit{L},\ \mathbit{d}_\mathbit{model} 為 (64, 128, 64)
\mathbit{CM}-\mathbit{CUDA} 6.62★ 66.6★
\mathbit{M}-\mathbit{CUDA} 39.78 53.6
\mathbit{M}-\mathbit{CPU} 58.26 696.5
\mathbit{B},\ \mathbit{L},\ \mathbit{d}\_\mathbit{model} 為 (64, 256, 64)
\mathbit{CM}-\mathbit{CUDA} 12.14★ 124.6
\mathbit{M}-\mathbit{CUDA} 45.91 96.9
\mathbit{M}-\mathbit{CPU} 162.32 1381.2
表 4：模型不同參數比較表
測試數據地展示了客製化 CUDA 核心的巨大優勢。在不同負載下，CM-CUDA 的運算速度比原版 M-CUDA 快了 4 到 6 倍，比 CPU 版本更是快了數十倍。雖然在 B=64, L=256, d_model=64 的設定下，CM-CUDA 的記憶體佔用（124.6 MB）略高於標準 M-CUDA（96.9 MB），但這主要應該是由於 CM-CUDA 採用了額外的 Chebyshev 核心並未做大量優化，並非 Chebyshev 問題。此外，CM-CUDA 的運算速度仍大幅優於 M-CUDA（12.14 ms vs. 45.91 ms），表明其底層 CUDA 優化策略成功提升了 GPU 運算效率。整體而言，這顯示 CM-CUDA 在加速模型推論方面具有明顯優勢，即便在記憶體略有增加的情況下，仍值得在高效能應用中採用。 4. 結論
所提出用 Chebyshev 多項式近似取代自注意力中的點積運算，成功在 Jetson Nano 上展現加速效果。實驗顯示，Chebyshev Transformer 在推論與訓練時間上較基線模型更高效，僅付出小幅精度代價；而結合 Mamba 與客製化 CUDA 核心後，更實現 4–6 倍的加速，凸顯數學近似搭配底層優化的潛力。
研究證明 Chebyshev 多項式是一條具前景的 Transformer 優化路線，特別適合資源受限的邊緣設備。未來可延伸至更大數據集與更多任務，或與其他近似與硬體加速方法結合。這份成果將成為我進一步在研究所探索數學近似與高效深度學習的起點。 5. 參考文獻：
Dao, T. (2023). FlashAttention-2: Faster and memory-efficient exact attention with IO-aware parallelization. arXiv preprint arXiv:2307.08691.
Qi, Y., Ye, P., Han, X., Liu, K., Yang, W., & Li, Y. (2023). SemSA: Semantic Sparse Attention for Large Language Models. International Conference on Learning Representations (ICLR).

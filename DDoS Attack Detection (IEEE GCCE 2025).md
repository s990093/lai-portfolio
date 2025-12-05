專題一：基於多熵分群與 Mamba 模型的高效 DDoS 攻擊檢測系統
摘要與研究成果與成果
本研究提出一套「多熵快篩 + Mamba 分析」的 DDoS 偵測架構，先以 Shannon、Rényi 與最小熵結合 PSO 強化的 GMM 快速過濾 67.2% 的高純度攻擊流量，再以 Mamba 模型進行序列分類，於 CIC 系列資料集上達成 F1-score 0.983、吞吐量 383.52 樣本/毫秒與僅 499MB 記憶體消耗，整體效能較 Transformer 提升 5.5 倍，展現了準確率、即時性與資源效率的最佳平衡。
研究背景
分散式阻斷服務攻擊（DDoS）透過大量受感染裝置（殭屍網路）同時向目標伺服器發送請求，耗盡資源，使網站或服務無法正常運作。隨著網路技術發展，DDoS 攻擊不僅規模更大，也更精細與破壞性更強。傳統攻擊以流量型為主（如 UDP 洪水、ICMP 洪水），近年則出現應用層攻擊（如 HTTP 洪水、Slowloris），甚至 AI 智能攻擊，使防禦更困難。根據報告 [1-2]，雖然 DDoS 次數下降，但平均攻擊規模暴增，單次流量可達數百 Gbps 至數 Tbps。現有防禦技術在實時性與複雜攻擊適應性方面仍面臨挑戰。
然而，現有防禦技術仍存在限制：流量閾值檢測對高流量攻擊仍有效，但對低速持續或瞬時爆量的攻擊反應不足；AI 模型雖能提升準確率，但推理延遲過長，無法及時應對流量激增。
文獻摘要
現行的 DDoS 攻擊檢測技術主要可分為三大類：特徵碼比對、異常流量檢測，以及機器／深度學習方法。特徵碼比對技術在工業界應用最廣，透過維護已知攻擊樣式資料庫快速比對，對已知攻擊準確且反應迅速，但對零日攻擊無能為力，且面對大規模、多向量攻擊時效能容易下降。
異常流量檢測方法則透過建構正常行為基線來辨識異常事件，其中基於熵（Entropy-based）的度量方法，如 Shannon 熵與 Rényi 熵，由於輕量且易於分散式部署，廣泛應用於 DDoS 防禦系統[3]。然而，單一熵模型對低速率或混合模式攻擊辨識力有限。為提升檢測效能，研究逐步引入動態閾值、結合多維熵指標與統計特徵，以及分群與啟發式優化（如 PSO 結合 k-means 或模糊 C 均值），以捕捉更複雜的流量變化，但在極低速或多樣化攻擊下仍存在辨識挑戰 [4-9]。
近年來，大數據與硬體加速推動了機器學習與深度學習在 DDoS 攻擊檢測中的應用 [11–15]。傳統模型如 XGBoost、SVM 能學習攻擊特徵，而深度學習方法則展現更高準確率。CNN-LSTM 架構因能兼顧局部特徵與時間依賴而表現優異 [11,12]，但 RNN/LSTM 仍面臨梯度消失及難以並行的問題。Transformer 透過自注意力有效捕捉長程關聯性，在複雜流量下具高準確率 [13–15]，計算與記憶體開銷龐大，不利於即時防禦。
為突破此計算瓶頸，本研究引入了新一代的狀態空間模型（State-Space Model, SSM）—— Mamba [15]。Mamba 旨在從根本上解決 Transformer 模型 O\left(N^2\right) 的二次方複雜度問題。它透過選擇性的狀態壓縮機制，能夠在維持高模型表達能力的同時，實現線性時間 O(N)\ 的推論效率。這項優勢攻克了現有高精度模型難以在 DDoS 防禦中即時部署的核心難題，從而實現了偵測準確性與即時性的兼顧，這也是本研究選用 Mamba 作為深度分析核心的關鍵所在。
綜上所述，提出「多熵快篩 + Mamba 精析」二階段檢測流程：先以 Shannon、Rényi 與 Min-entropy 多熵特徵結合 PSO–GMM 分群快速標記可疑流量，再僅將少量可疑流量送入 Mamba 模型深度分析，有效兼顧準確率與即時性。

研究方法
本研究旨在針對大規模網路流量進行高效且高準確度的 DDoS 檢測，將每個流量樣本 x*i\in\mathcal{D} 分類為攻擊或良性流量 y_i\in\{\mathrm{DDoS},\ \mathrm{Benign}\}，目標是在最大化檢測準確率的同時，最小化計算成本並滿足即時性要求，為此設計兩階段階層化決策，快速攔截明顯攻擊，並對難以判定的流量進行高精度分析，以實現效率與精度的平衡。此階層化網路具體可分為以下幾個層次：
輸入層： 接收原始網路流量數據，並將其抽象為一組特徵向量集合 \mathcal{D}=\{\mathbit{x}*\mathbit{i}\}_{i=1}^N，其中每個 x_i 代表一個流量樣本的特徵向量，而 N 是輸入樣本的總數。
第一階段：快速過濾層： 此階段作為系統的前端，應用輕量級的非監督式分類器，目標是以最低的計算成本，快速從海量流量中識別並過濾掉模式明確的高純度 DDoS 攻擊。其運作流程如下：
多熵特徵計算：系統首先針對輸入流量計算多種熵度量，包括 Shannon 熵、Rényi 熵與最小熵，以全面捕捉流量的隨機性與變異性。
快速分群：接著，將這些熵特徵輸入至一個由粒子群最佳化 (PSO) 演算法強化的高斯混合模型 (GMM) 中。此模型會將流量自動分為兩類：高純度攻擊叢集 (\mathbit{C}_{\mathbit{ddos}})：特徵明確、具有顯著異常的流量樣本。混合叢集 (\mathbit{C}_{\mathbit{mixed}})：特徵模糊、難以直接判別的混合流量樣本。 對於被歸類至 C_{mixed}的流量，系統將直接執行阻擋動作，無需進一步分析。以大幅減少後續階段的處理負荷。
第二階段：深度分析層：此階段僅針對在過濾層中被歸類為混合叢集 C*{mixed} 的少量可疑流量。系統會應用一個高精度、高效能的監督式深度學習模型（Mamba 架構）進行深度分析，以識別複雜的攻擊模式。此過程為一個概率映射函數 f:C*{mixed}\rightarrow\left[0,1\right]，其輸出值 f(x) 代表該流量為攻擊的概率。
輸出層： 此層整合前兩個階段的結果，執行最終的流量處理決策：若流量屬於 C*{ddos}，則已在過濾層被直接阻擋。若流量屬於 C*{mixed}，則根據深度分析層的輸出概率 f(x) 進行判決：若\ f(x)\geq0.5，則判定為 DDoS 攻擊並阻擋；否則判定為良性流量並放行。 同時，輸出層會記錄系統的關鍵效能指標，如總吞吐量、各階段延遲時間，以評估系統整體效能並支持後續優化。
透過這種階層式的設計，絕大多數明確的攻擊流量能被快速處理，僅將少量複雜的流量交由計算成本較高的模型分析，從而大幅提升系統整體的吞吐量與反應速度，達成效率與精度的最佳平衡。

圖 1. 兩階段 DDoS 檢測系統流程圖

表 1. 符號定義
符號 定義
\mathbf{D}=\{\mathbit{x}_\mathbit{i}\}_{\mathbit{i}=\mathbf{1}}^\mathbit{N} 輸入特徵集合
\mathbit{x}_\mathbit{i} 單一流量樣本的特徵向量
\mathbit{N} 輸入樣本數量
\mathbit{C}_{\mathbit{ddos}} 高純度攻擊叢集
\mathbit{C}_{\mathbit{mixed}} 模糊叢集
\mathbf{w}\ GMM 模型參數集合，包含各高斯分佈的均值 \mu_k、協方差矩陣 \mathrm{\Sigma}\_k 與混合權重 \pi_k
\mathbf{d}_\mathbf{k}、\mathbf{b}_\mathbf{k} 叢集中被標記為 DDoS 的樣本數與被標記為良性的樣本數。
\mathbit{w}_{\mathbit{ddos}} \mathbit{w}_{\mathbit{benign}} 為調節純度的權重
\mathbf{\theta} 高純度 DDoS 叢集的純度門檻值
\mathbf{\lambda}_{\mathbf{penalty}}
一個極大的懲罰常數
\mathbit{B} 一次送入模型的資料筆數
\mathbit{T} 每筆資料包含的封包序列長度
\mathbit{D}\_{\mathbit{in}} 每個時間步的封包特徵維度
多熵特徵選擇
在異常流量檢測中，首先對每個時間窗口計算 Shannon 熵、Rényi 熵與最小熵，並將其組成特徵向量；為降低分群計算複雜度與避免冗餘，透過條件熵 H\left(X\mid\mathrm{ddos}\right) 評估各特徵對於區分正常與 DDoS 流量的資訊價值，條件熵越低表示特徵越關鍵，最終僅選取前 10% 條件熵最ㄉ低的特徵作為 GMM 輸入。
PSO–GMM 分群方法
本研究第一階段的目標是尋找一組最佳高斯混合模型（GMM）參數 w^\ast，以最小化目標函數\ F(w)。這裡，w 包含 GMM 的所有參數（混合權重、均值和協方差），用於對流量資料進行分群。最小化問題的目的是生成高純度的 DDoS 攻擊叢集，同時減少良性流量被錯誤歸類到攻擊叢集的情況，從而降低傳遞到第二階段的混合流量，提升整體檢測效能。具體而言，最小化目標定義為：
w^\ast=\arg{\min\below w{F}}\left(w\right)
其中 F\left(w\right) 由以下目標函數定義，目標函數的設計旨在鼓勵高純度 DDoS 叢集的形成，並懲罰良性流量的誤分類。
A. 目標函數定義
目標函數 F(w) 的具體形式如下：

函數由兩個部分構成：獎勵機制與懲罰機制。獎勵機制鼓勵演算法找到「純度高的 DDoS 攻擊叢集」，即當某個叢集中 DDoS 樣本的比例 \frac{d*k}{d_k+b_k} 越高時，該叢集的評分越佳，進而使得整體目標函數值降低。此部分的影響可透過權重{\ w}*{ddos} w*{benign}調節，以控制獎勵對最終目標的貢獻。相對地，懲罰機制則避免分群結果過度將良性流量誤歸為攻擊樣本。當某個叢集中混入的正常流量 b_k 越多，目標函數的值會顯著增加，從而抑制此類錯誤結果。
此外，為確保分群結果具有實際意義，本研究在目標函數中內嵌了一項關鍵的限制條件：在最終的分群結果中，必須至少存在一個叢集，其 DDoS 純度大於等於預設門檻值 \theta。若此條件無法滿足，則代表當前的分群結果未能有效區分攻擊樣本與正常樣本，此時目標函數的值將被強制設為一個極大的懲罰常數 \lambda*{penalty}，以排除這類無效解。透過此種獎勵與懲罰兼具的設計，演算法在搜尋最優參數 w^{\ast\ }的過程中，將被有效引導至能產生「高純度 DDoS 攻擊叢集」的解，進一步提升第一階段過濾層的檢測效能與可靠性。
B. PSO 求解方法
粒子群最佳化（PSO）是一種基於群體的啟發式演算法，透過模擬粒子在搜尋空間中的協作行為，能有效克服目標函數的非凸性與初始參數敏感性。每個粒子代表一組 GMM 參數 w，其適應度由目標函數 f\left(x\right) 評估。粒子根據自身的歷史最佳解（pBest）及群體的全域最佳解（gBest）更新位置與速度，並重複迭代以搜尋最優解。最終，對應 gBest 的參數 w^\ast 即為最佳解，用於第一階段的線上流量分群。PSO 的全域搜尋能力確保演算法能有效探索複雜參數空間，生成高純度的 DDoS 攻擊叢集。

3.3 Mamba 模型架構
本模組接收來自第一階段無法明確分類的混合資料流（C*{mixed}）其核心為 Mamba 架構，輸入資料為經過前處理的封包特徵序列 D，其張量維度為 \left[B,T,D*{\mathrm{in}}\right]。首先透過 Linear projection 將輸入映射到隱藏空間，並施加 LayerNorm 與 Dropout 以穩定訓練；同時加入 Positional Encoding 以保留序列的時序資訊。接著，資料流進入核心堆疊構成的 Mamba Block，每層設定為隱藏維度、狀態維度 、卷積核大，以提升推論效率與訓練穩定性。最後，以 Mean Pooling 將整個序列壓縮為單一向量，經由兩層 FFN 及 LayerNorm 處理，最終輸出經 Sigmoid activation 映射到[0,1]的機率值，作為 DDoS 攻擊判定依據。於推論時，若輸出機率 ≥ 0.5，則判定為攻擊並執行阻擋，否則為正常流量放行。

    實驗成果

本研究所設計之多階段 DDoS 偵測系統的實驗配置、效能評估與比較分析。實驗分為三大部分：首先，定義實驗環境與關鍵變數；其次，分階段評估第一階段分群機制與第二階段深度學習模型的效能；最後，整合分析整體系統在不同情境下的推論速度與效率。
4.1 實驗變數與評估指標
為確保整體實驗流程具備嚴謹性與可重現性，本研究明確定義了自變數、應變數與控制變數，並依據不同模型與場景進行統一化設定。相關實驗變數分類如下表所示（表 4.1）。並所有實驗均分別於兩套獨立硬體平台上進行，以提升結果的通用性並模擬實際部署情境。第一階段實驗為模擬真實電腦部署環境，特別採用了支援 AVX-512 指令集的多核心 CPU（Intel Xeon Silver 4514Y），以提升向量化運算效率並準確反映模型在純 CPU 環境下的推理效能。第二階段則使用 NVIDIA RTX 3090 GPU，測試模型在高效能 GPU 上的吞吐量、延遲與資源使用情形。上述兩階段的完整硬體規格整理於附錄 A.1 表；此外，實驗中所使用的 GMM、PSO 與 Mamba 模型之參數設定亦詳列於附錄 A，以便後續驗證與重現研究結果。
現在電腦都有 avx512…. 但是 3090 至電腦都只有 10 核心….
表 4.1 實驗變數定義表

變數類型 變數名稱 說明與數值
自變數 模型架構 比較 Mamba 與 Transformer 模型。
系統框架 比較 Mamba-two-stage (本研究) 與 Transformer-one-stage。
需要說 one-stage 跟 two-stage 定義
需要探討熵 到底要幹嗎？
因爲 熵 就是適合… 應且演算法….
透過 xxcxx 演算法
推論精度 比較 FP32 與 FP16 兩種浮點數精度。
批次大小 (Batch Size) 測試不同批次 (1, 16, 32, 64) 對效能的影響。
分群方法 比較 PSO-GMM 與標準 GMM 的過濾效能。
應變數 分類效能指標 Accuracy, Precision, Recall, F1-score。
訓練過程指標 Validation Loss, 收斂速度 (Epochs)。
推論效能指標 延遲 (Latency), 吞吐量 (Throughput)。
資源消耗指標 顯示記憶體使用量 (VRAM), 總訓練時間 (Total Time)。
系統總延遲 t\_{\mathrm{total}} 。
系統加速比 Speedup (相對於 Transformer one-stage)。
控制變數 硬體配置 熵計算與模型訓練使用不同的專用硬體。
實驗資料集 CSE-CIC-IDS2018-AWS、CICIDS2017 及 CIC-DoS-2016 提取的 DDoS 與正常流量構建的平衡資料集。
需要做平衡？？？ 需要做說明？？資料集 透過 熵 幫我平衡
熵 ->算出新的資酪集
資料切分 80% 訓練, 20% 測試。
隨機種子 固定為 42。
特徵處理 包含多熵特徵計算、歸一化及異常值移除。
視窗大小 固定為 512 (window_size) 。

先證明熵 -> 做不同熵 沒講倒熵那塊 很好 要先證明 熵會減少資料量
4.2 第一階段：分群結果
先說 two-stage 要直接說貢獻
想辦法要切入到熵 那塊 再到 two-stage

我們用第二階段 ->
本階段的核心目標是快速過濾大部分明確的 DDoS 流量，以降低後續分析模型的計算負擔。我們比較了標準 GMM 與 PSO-GMM 的分群效能，並進行了分層抽樣來控制資料比例，以確保抽樣樣本能夠代表原始資料集的標籤分布。而對原始資料進行 10% 抽樣，保留了 DDoS 與正常流量的比例（DDoS 50.59%，Benign 49.41%），抽樣後共計 1,279,463 筆資料。在特徵選擇上，使用條件熵評估各特徵的重要性，取熵值最低的最後 10% 特徵，最終選出 8 個最具辨識力的特徵用於後續熵計算。
表 6. 第一階段分群效能比較
方法 叢集類型 正常(%) 攻擊 (%) 總計 (%)
GMM cmixed 44.99 55.01 85
cddos 0.1 99.9 38.4
PSO+GMM (研究) \mathbit{cmixed} 58.6 41.4 32.8
\mathbit{cddos} 5.2 94.8 67.2
透過表 6 得知，約 67.2% 的總流量被歸入高信度 DDoS 叢集 (cddos)，該叢集攻擊流量純度達 94.8%，僅容忍 5.2% 的誤報。相對地，混合流量叢集 (Cmixed\ ) 從原始的 100% 大幅降至 32.8%。這反映了「以微小誤報換取高效過濾」的非對稱策略設計，能直接阻擋超過三分之二的傳入流量，顯著減輕後續分析模型負擔。
4.3.1 第二階段：Mamba 模型分類效能與成本
在第一階段過濾掉高純度 DDoS 流量後，本研究針對的流量進行深度學習模型的分類效能與資源成本評估，比較 Mamba 與 Transformer 兩種模型在分類效能與推論成本上的表現。分類效能指標可定義如下：
其中，TP,\ TN,\ FP,\ FN 分別表示真陽性、真陰性、假陽性與假陰性樣本數。
4.3.1 模型分類性能與資源監控
為驗證 Mamba 與 Transformer 模型在二分類任務中的表現，本研究首先比較兩者在測試集上的最終分類指標，結果如下表所示。

實驗結果顯示，兩種模型在最終分類準確度上幾乎無差異，Accuracy、Precision 與 Recall 均達到 0.999x 水準，F1-score 上 Mamba 稍高於 Transformer（0.9998 vs. 0.9996），表明在分類能力上兩者相當。
然而，進一步分析模型的收斂過程揭示了更明顯的差異。從學習曲線觀察，Mamba 與 Transformer 在 Validation F1-Score、ROC-AUC 及 Recall 均於第 4 個 epoch 左右迅速達到完美分數，但 Mamba 的 Validation Loss 收斂速度更快，最終損失僅約 0.015，而 Transformer 約為 0.09，顯示 Mamba 達成了更優的模型擬合狀態。訓練效率方面，Mamba 的平均吞吐量高達 19,980 samples/sec，是 Transformer 的 10 倍以上；同時，Mamba 在訓練過程中僅使用約 4.8 GB VRAM，相比 Transformer 約 9 GB 的消耗節省近一半。
綜合上述結果，雖然兩種模型在分類準確度上相近，Mamba 在收斂速度、最終擬合以及訓練資源效率上均具有顯著優勢。這證明其結構化狀態空間 (SSM) 設計不僅能維持高精度分類，同時實現快速訓練與低資源消耗，使其在 DDoS 流量分類任務中更高效且具實用價值。
4.3.2 推理效能
本節彙整 Mamba 與 Transformer 於不同 batch 大小與精度設定 (FP32/FP16) 下的推理基準表現，包含延遲 (Latency)、吞吐量 (Throughput) 與顯示記憶體使用量 (VRAM) 。

圖：延遲比較圖

圖：吞吐量比較圖

圖：記憶體用量比較圖
整體而言，Mamba 在各批次設定下均展現出顯著優於 Transformer 的效能。其吞吐量隨批次增加線性上升，在 FP32 模式下最高達 59,379.4 samples/s，FP16 模式更進一步達 71,921.6 samples/s，而 Transformer 僅能提升至約 3,450 samples/s。
延遲方面，單樣本情境下 Transformer FP32 具最低延遲 (0.65 ms)，但隨批次增加，延遲呈線性增長，至 64 batch 時達 18.55 ms。相比之下，Mamba 在大批次下延遲極低且穩定，FP16 模式下 64 batch 僅 0.89 ms，顯示其狀態空間結構能有效並行化序列運算。
在資源消耗上，Mamba 的 GPU 占用始終低於 2.6 GB，而 Transformer 隨批次增大最高達 3.1 GB，反映出 Mamba 具有更佳的記憶體效率。
綜合而言，Mamba 在保持相同準確度下，不僅推理效率顯著提升，能效也明顯優於 Transformer，其高並行度結構與線性時間複雜度使其在中大型批次推理中表現穩定且具良好延展性。
4.4 整體系統推論速度比較 先講
為評估本研究提出的多階段 DDoS 偵測系統效能，本節說明系統延遲的測量方法與實驗設計。所有封包序列均以固定視窗大小進行分割，並依批次 (Batch) 作為處理單位進行量測。系統總延遲 (t*{\mathrm{total}}) 定義為各階段處理耗時的累計：
t*{\mathrm{total}}=t*{\mathrm{entropy}}+t*{\mathrm{stage1}}+t*{\mathrm{stage2}}
其中，t*{\mathrm{entropy}} 為多熵特徵計算時間，t*{\mathrm{stage1}} 為前端聚類分群時間，t*{\mathrm{stage2}} 為後端深度學習模型推論時間。前端特徵計算與聚類均以 batch × window_size 為單位進行，後端推論僅針對前端篩選出的高純度群組 (約占總流量 32.8%) 執行。此設計確保延遲測量能反映不同批次設定與二階段篩選策略下的真實推論成本。

圖：FP32 下
\mathbit{Mode} \mathbit{Batch} \mathbit{t}_{\mathbit{entropy}} \mathbit{t}_{\mathbit{stage}\mathbf{1}} \mathbit{t}_{\mathbit{stage}\mathbf{2}} t_{total}\left(ms\right) \mathbit{Speedup}
One-stage 1 0.025 - 1.415 1.440 1.000
Two-stage 1 0.025 0.003 0.456 0.483* 2.978
One-stage 16 0.028 - 4.890 4.918 1.000
Two-stage 16 0.028 0.011 0.262 0.302 16.292
One-stage 32 0.036 - 9.420 9.456 1.000
Two-stage 32 0.036 0.020 0.266 0.321* 29.470
One-stage 64 0.035 - 18.550 18.585 1.000
Two-stage 64 0.035 0.037 0.354 0.427* 43.540
圖：FP16 下
\mathbit{Mode} \mathbit{Batch} \mathbit{t}*{\mathbit{entropy}} \mathbit{t}_{\mathbit{stage}\mathbf{1}} \mathbit{t}_{\mathbit{stage}\mathbf{2}} \mathbit{t}_{\mathbit{total}}(ms) \mathbit{Speedup}
One-stage 1 0.025 - 1.415 1.440 1.000
Two-stage 1 0.025 0.003 0.298 0.326_ 4.416
One-stage 16 0.028 - 1.740 1.768 1.000
Two-stage 16 0.028 0.011 0.423 0.463* 3.822
One-stage 32 0.036 - 3.170 3.206 1.000
Two-stage 32 0.036 0.020 0.298 0.354* 9.064
One-stage 64 0.035 - 6.020 6.055 1.000
Two-stage 64 0.035 0.037 0.292 0.365\* 16.61
圖：不同階段的總推論延遲

4.5 結論
本章節的實驗結果清晰地驗證了本研究所提出的多階段 DDoS 偵測系統在推論速度上的卓越效能。實驗數據表明，相較於傳統的單階段（One-stage）深度學習模型，本研究的二階段（Two-stage）架構能實現顯著的延遲降低與速度提升。
此一效能增益的核心，歸功於 t*{\mathrm{stage1}}（前端聚類分群）的高效篩選機制。該階段以極低的運算成本（例如，在 Batch 64 時 t*{\mathrm{entropy}} 與 t*{\mathrm{stage1}} 總和僅約 0.072ms），成功將後端深度學習模型 (t*{\mathrm{stage2}}) 需要處理的流量縮減至總量的 32.8%。
在 FP32 精度下，此架構的優勢隨批次（Batch）增大而愈發明顯。單階段模型的推論延遲隨批次線性增長，在 Batch 64 時 t*{\mathrm{total}} 高達 18.585ms；反觀二階段模型，t*{\mathrm{total}} 始終維持在 0.5ms 以下的極低水平，於 Batch 64 時達成了 43.54 倍的驚人速度提升。這證明本系統在高吞吐量（high-throughput）情境下具有出色的可擴展性。
在 FP16 精度下，儘管量化已大幅優化了單階段模型的基線速度（Batch 64 時為 6.055ms），本研究的二階段模型依然展現出強勁的加速效果，在 Batch 64 時取得了 16.61 倍的速度提升。
綜合而言，多階段偵測系統透過輕量級的前端篩選，大幅降低了後端深度學習模型的推論負擔，無論在 FP32 還是 FP16 精度下均實現了顯著的加速，證實了此架構在實現高效能、低延遲的即時網路威脅偵測上具有高度的可行性與實用價值。 5. 結論與成果
究提出一套雙層式 DDoS 偵測架構，結合 PSO 優化 GMM 異常流量分群與 Mamba 模型檢測，並透過實驗驗證其可行性。結果顯示，該架構不僅能有效辨識高純度 DDoS 群集，還能降低正常流量誤判率，具備良好的擴展性，可應用於大規模分布式系統與即時監控系統。
透過此專題，我對資安領域的異常流量檢測、分群演算法及模型優化策略有了更深入的理解，也實際體驗了從理論設計到實作驗證的完整流程。這些經驗將成為我未來進入資安與 AI 研究領域的重要基礎，並為後續探索更高效、可擴展的防禦機制提供實務參考。 6. 參考文獻
[1] Nexusguard, “DDoS Trend Report 2024,” Nexusguard, 2024. [Online]. Available: https://www.nexusguard.com/threat-report/ddos-trend-report-2024
[2] Cloudflare, “DDoS Threat Report: Q3 2024,” Cloudflare, Oct. 2024. [Online]. Available: https://radar.cloudflare.com/reports/ddos-2024-q3
[3] K.-S. Yu, S.-H. Kim, D.-W. Lim, and Y.-S. Kim, “A Multiple Rényi Entropy based Intrusion Detection System for Connected Vehicles,” Entropy, vol. 22, no. 2, p. 186, Feb. 2020.
[4] S. Yu, J. Zhang, J. Liu, X. Zhang, Y. Li, and T. Xu, “A cooperative DDoS attack detection scheme based on entropy and ensemble learning in SDN,” 2021.
[5] M. A. Aladaileh, “Effectiveness of an entropy-based approach for detecting low- and high-rate DDoS attacks against the SDN controller: Experimental analysis,” 2023.
[6] C. Fan, “Detection of DDoS Attacks in Software Defined Networking Using Entropy,” 2022.
[7] H. Kumar, K. Kanodia, P. Kujur, A. Kumar, and S. Patel, “DDoS detection approach using inter-quartile range and entropy,” 2024.
[8] A. I. Hassan, E. A. Abd El Reheem, and S. K. Guirguis, “An entropy and machine learning based approach for DDoS attacks detection in software defined networks,” 2024.
[9] 高皓, “基於 Fuzzy C-Means 開集識別技術之未知 DDoS 攻擊偵測,” 國立高雄科技大學, 2023.
[10] A. Kim, M. Park, and D. H. Lee, “AI-IDS: Application of Deep Learning to Real-Time Web Intrusion Detection,” in Proc. 2020 IEEE Int. Conf. on Cyber Security (ICCS), Seoul, South Korea, 2020.
[11] O. Yousuf and R. N. Mir, “DDoS attack detection in Internet of Things using recurrent neural network,” 2022.
[12] M. A. Setitra, M. Fan, B. L. Y. Agbley, and Z. E. Bensalem, “Optimized MLP-CNN model to enhance detecting DDoS attacks in SDN environment,” 2023.
[13] A. John, I. F. Bin Isnin, S. H. H. Madni, and M. Faheem, “Intrusion detection in cluster‐based wireless sensor networks: Current issues, opportunities and future research directions,” IET Wireless Sensor Systems, vol. 14, no. 6, pp. 293–332, Dec. 2024, doi: 10.1002/ett.4827.
[14] F. Talpur, I. A. Korejo, A. A. Chandio, A. Ghulam, and M. S. H. Talpur, “ML-based detection of DDoS attacks using evolutionary algorithms optimization,” MDPI, 2024.
[15] A. Gu and T. Dao, “Mamba: Linear-time Sequence Modeling with Selective State Spaces,” arXiv preprint arXiv:2312.00752, v.2, 2024.
附錄 A
本附錄列出本研究兩階段 DDoS 檢測框架中所使用的所有主要模型與演算法參數。
分類 項目 規格
熵計算 (CPU 為主) 架構 x86_64 19
CPU 型號 Intel Xeon Silver 4514Y 20
核心/執行緒 32 cores/64 threads 21
記憶體大小 64 GB 22
模型訓練與推理 架構 x86_64 23
CPU 型號 AMD Ryzen 9 7900X 12-Core 24
核心/執行緒 12 cores/24 threads 25
記憶體 31 GB 26
GPU 型號 NVIDIA GeForce RTX 3090 27
CUDA 版本 12.7 28
顯存大小 24 GB GDDR6X 29

A.1 GMM 參數設定
參數名稱 數值 說明
\mathbit{n}_\mathbit{components} 2 分群數（攻擊 / 混合）
\mathbit{random}_\mathbit{state} 42 隨機種子
\mathbit{n}_\mathbit{init} 10 初始化次數
A.2 PSO 參數設定
參數名稱 數值 說明
\mathbit{SAMPLE}_\mathbit{FRAC} 0.1 分層抽樣比例
\mathbit{dimensions} 2 粒子維度（對應 GMM 元件數）
\mathbit{w}_\mathbit{ddos} 0.7 目標函式中獎勵 DDoS 叢集的權重
\mathbit{w}_\mathbit{benign} 0.3 目標函式中懲罰良性流量的權重
\mathbit{c}\mathbf{1} 1.6 認知係數（個體經驗學習率）
\mathbit{c}\mathbf{2} 1.8 社會係數（群體經驗學習率）
\mathbit{w} 0.8 慣性權重
\mathbit{n}\_\mathbit{particles} 200 粒子數量
\mathbit{iters} 100 最大迭代次數
\mathbit{PATIENCE} 12 無改善迭代次數
A.3 門檻值設定
參數名稱 數值 說明
\mathbit{\theta} 0.9 高純度 DDoS 叢集的純度門檻
A.4 第二階段 Mamba 模型參數
參數名稱 數值 說明
hidden_dim 256 模型隱藏層維度
n_layers 4 Mamba 區塊（SSM）堆疊層數
dropout 0.2 Dropout 比例，用於防止過擬合
seq_len 16 輸入序列長度（時間步長）
d_state 16 狀態空間維度
expand_factor 2 Block 內部隱藏維度擴展倍數
d_conv 4 Block 內部一維卷積核心大小

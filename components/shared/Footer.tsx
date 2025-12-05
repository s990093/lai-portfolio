export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm font-mono">
          © {new Date().getFullYear()} Lai Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <section className="mx-auto flex max-w-[640px] flex-col items-center px-6 py-32 text-center md:px-12">
        <div className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[2px] text-accent">
          Documentation
        </div>
        <h1 className="mb-4 text-[32px] font-bold tracking-[-1px] md:text-[40px]">
          Docs are coming soon.
        </h1>
        <p className="text-[15px] leading-[1.7] text-muted">
          In the meantime, check out the{" "}
          <a
            href="https://github.com/GenesisPray/safetrade-contract"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            contract source on GitHub
          </a>
          .
        </p>
      </section>
      <Footer />
    </>
  );
}

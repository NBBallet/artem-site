"use client";

interface Props {
  instagram: string;
  threads: string;
  facebook: string;
  locale: string;
  whatsappPhone: string;
}

function openApp(scheme: string, webUrl: string) {
  window.location.href = scheme;
  setTimeout(() => {
    if (!document.hidden) window.open(webUrl, "_blank");
  }, 600);
}

function handle(url: string): string {
  return url.replace(/\/$/, "").split("/").pop()?.replace(/^@/, "") ?? "";
}

export default function ContactSection({
  instagram,
  threads,
  facebook,
  locale,
  whatsappPhone,
}: Props) {
  const uk = locale === "uk";
  const fr = locale === "fr";
  const igHandle = handle(instagram);
  const thHandle = handle(threads);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

      {/* ── WhatsApp ── */}
      <button
        onClick={() => {
          window.location.href = `whatsapp://send?phone=${whatsappPhone}`;
          setTimeout(() => {
            if (!document.hidden) window.open(`https://wa.me/${whatsappPhone}`, "_blank");
          }, 600);
        }}
        className="group flex flex-col items-center gap-5 p-6 md:p-8 border border-[#222] rounded-lg hover:border-brand-red/40 bg-[#111] hover:bg-[#161616] transition-all duration-200 cursor-pointer w-full"
      >
        <div className="w-16 h-16 flex items-center justify-center bg-brand-red/10 rounded-full group-hover:bg-brand-red/20 transition-colors">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="text-brand-red">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="t-mono text-[13px] tracking-[2px] uppercase text-brand-white">
            WhatsApp
          </p>
          <p className="t-meta-c text-[13px] mt-1.5">
            {fr ? "Écrire" : uk ? "Написати" : "Message"}
          </p>
        </div>
      </button>

      {/* ── Instagram ── */}
      <a
        href={instagram}
        onClick={(e) => { e.preventDefault(); openApp(`instagram://user?username=${igHandle}`, instagram); }}
        className="group flex flex-col items-center gap-5 p-6 md:p-8 border border-[#222] rounded-lg hover:border-brand-red/40 bg-[#111] hover:bg-[#161616] transition-all duration-200 cursor-pointer"
      >
        <div className="w-16 h-16 flex items-center justify-center bg-brand-red/10 rounded-full group-hover:bg-brand-red/20 transition-colors">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="t-mono text-[13px] tracking-[2px] uppercase text-brand-white">
            Instagram
          </p>
          <p className="t-meta-c text-[13px] mt-1.5">@{igHandle}</p>
        </div>
      </a>

      {/* ── Facebook ── */}
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-5 p-6 md:p-8 border border-[#222] rounded-lg hover:border-brand-red/40 bg-[#111] hover:bg-[#161616] transition-all duration-200"
      >
        <div className="w-16 h-16 flex items-center justify-center bg-brand-red/10 rounded-full group-hover:bg-brand-red/20 transition-colors">
          <svg width="26" height="26" viewBox="0 0 320 512" fill="currentColor" className="text-brand-red">
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="t-mono text-[13px] tracking-[2px] uppercase text-brand-white">
            Facebook
          </p>
          <p className="t-meta-c text-[13px] mt-1.5">{handle(facebook)}</p>
        </div>
      </a>

      {/* ── Threads ── */}
      <a
        href={threads}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-5 p-6 md:p-8 border border-[#222] rounded-lg hover:border-brand-red/40 bg-[#111] hover:bg-[#161616] transition-all duration-200"
      >
        <div className="w-16 h-16 flex items-center justify-center bg-brand-red/10 rounded-full group-hover:bg-brand-red/20 transition-colors">
          <svg width="24" height="24" viewBox="0 0 192 192" fill="currentColor" className="text-brand-red" xmlns="http://www.w3.org/2000/svg">
            <path d="M141.537 88.988a66.667 66.667 0 00-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.23c8.249.053 14.474 2.452 18.502 7.13 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 96c.223 28.685 6.88 51.514 19.787 67.92 14.504 18.438 36.094 27.886 64.172 28.08h.113c24.986-.173 42.504-6.713 56.988-21.182 18.985-18.985 17.962-42.398 11.867-56.95-4.298-10.018-12.88-18.591-24.391-24.88zm-43.552 43.047c-10.44.587-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274z"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="t-mono text-[13px] tracking-[2px] uppercase text-brand-white">
            Threads
          </p>
          <p className="t-meta-c text-[13px] mt-1.5">@{thHandle}</p>
        </div>
      </a>

    </div>
  );
}

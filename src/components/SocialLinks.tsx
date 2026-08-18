"use client";

interface Props {
  instagram: string;
  threads: string;
  facebook: string;
  locale: string;
}

/** Try native app deep-link; fall back to web URL if app not installed. */
function openApp(scheme: string, webUrl: string) {
  window.location.href = scheme;
  // If the page is still visible after 600ms, the app didn't open → use web
  setTimeout(() => {
    if (!document.hidden) window.open(webUrl, "_blank");
  }, 600);
}

function handle(url: string) {
  return url.replace(/\/$/, "").split("/").pop()?.replace(/^@/, "") ?? "";
}

export default function SocialLinks({ instagram, threads, facebook }: Props) {
  const igHandle = handle(instagram);

  return (
    <div className="flex flex-col gap-4">

      {/* Instagram */}
      <a
        href={instagram}
        onClick={(e) => { e.preventDefault(); openApp(`instagram://user?username=${igHandle}`, instagram); }}
        className="group flex items-center gap-4 text-[#777] hover:text-brand-white transition-colors cursor-pointer"
      >
        <div className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] group-hover:border-brand-red/50 rounded-sm transition-colors flex-none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </div>
        <span className="text-sm tracking-wide">Instagram</span>
      </a>

      {/* Threads — no reliable deep-link; opens web in new tab */}
      <a
        href={threads}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 text-[#777] hover:text-brand-white transition-colors"
      >
        <div className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] group-hover:border-brand-red/50 rounded-sm transition-colors flex-none">
          {/* Official Threads "@" icon */}
          <svg width="16" height="16" viewBox="0 0 192 192" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M141.537 88.988a66.667 66.667 0 00-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.23c8.249.053 14.474 2.452 18.502 7.13 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 96c.223 28.685 6.88 51.514 19.787 67.92 14.504 18.438 36.094 27.886 64.172 28.08h.113c24.986-.173 42.504-6.713 56.988-21.182 18.Conway-18.985 17.962-42.398 11.867-56.95-4.298-10.018-12.88-18.591-24.391-24.88zm-43.552 43.047c-10.44.587-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274z"/>
          </svg>
        </div>
        <span className="text-sm tracking-wide">Threads</span>
      </a>

      {/* Facebook — no reliable deep-link; opens web in new tab */}
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 text-[#777] hover:text-brand-white transition-colors"
      >
        <div className="w-10 h-10 flex items-center justify-center border border-[#2a2a2a] group-hover:border-brand-red/50 rounded-sm transition-colors flex-none">
          <svg width="16" height="16" viewBox="0 0 320 512" fill="currentColor">
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
          </svg>
        </div>
        <span className="text-sm tracking-wide">Facebook</span>
      </a>

    </div>
  );
}

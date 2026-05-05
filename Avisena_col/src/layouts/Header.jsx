
export default function Header() {
  return (
      <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#d5e7d0] dark:border-[#2a3d24] bg-white/80 dark:bg-[#1a2e15]/80 px-10 py-3">
        <div class="flex items-center gap-4">
        <div class="size-8 text-primary">
        <svg fill="currentColor" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 44 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
        </svg>
        </div>
        <h2 class="text-lg font-bold leading-tight tracking-tight">Granja Avícola</h2>
        </div>
        <div class="flex items-center gap-4">
        <div class="hidden md:flex flex-col items-end">
        <span class="text-sm font-bold">Juan Pérez</span>
        <span class="text-xs text-[#5f974e]">Admin</span>
        </div>
        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" data-alt="User profile picture of Juan Pérez" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuPx4jvCNDaiRbVqys6VUjih18H2xG6_o4UyUwo9u1zL1aevGMVhTBPVA3qDhb_XLNqVrgSVQeOpOyx3oI7ovMH66BJvTfdRfnx0cBaHxwO4pXbjvpCbpGRBcEVl_B31zOgZu_hH9IEURd5ESofPIRlIaMta0N7cJ87G7ljeuHxg1kOR5DVolFATmKO4NfW7vBpoU47xaHHq-nehJ0tgJQdNjc0bVZ2iNDka955qSb2r9uQpPy463n4mxfdSZVPydcgRMuguFBn7gZ");'></div>
        </div>
      </header>
    
  )
}

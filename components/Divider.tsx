export default function Divider() {
  return (
    <div className="relative flex justify-center py-2" aria-hidden>
      <svg width="140" height="20" viewBox="0 0 140 20" fill="none">
        <path
          d="M0 10C15 2 25 2 35 10C45 18 55 18 65 10C75 2 85 2 95 10C105 18 115 18 125 10C130 6 135 6 140 10"
          stroke="#D9B26F"
          strokeOpacity="0.45"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="70" cy="10" r="2.5" fill="#DFA5A5" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

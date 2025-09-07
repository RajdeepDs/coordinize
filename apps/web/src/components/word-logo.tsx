export function WordLogo() {
  return (
    <div className="flex items-center text-foreground">
      <svg
        fill="text-foreground"
        height="16"
        viewBox="0 0 24 24"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Word Logo</title>
        <path
          clipRule="evenodd"
          d="M24 0H12.1696L6.38781 6.42002V3.16981L0 10.2642V17.283H5.98443V24H18.0186L24 16.9811L6.38781 16.907V6.86792H24V0Z"
          fill="black"
          fillRule="evenodd"
          style={{ fill: "currentcolor", fillOpacity: 1 }}
        />
      </svg>
      <span className="ml-2 text-lg">Coordinize</span>
    </div>
  );
}

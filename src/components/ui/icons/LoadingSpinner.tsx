function LoadingSpinner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M2 12a10.94 10.94 0 0 1 3-7.35c-.21-.19-.42-.36-.62-.55A11 11 0 0 0 12 23c.34 0 .67 0 1-.05C6 23 2 17.74 2 12">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.6s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export default LoadingSpinner;

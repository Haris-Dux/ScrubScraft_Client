export default function HeaderV2({
  badgeText = "POPULAR",
  title = "Our Products",
  description = "Explore our hottest picks! Discover the most sought-after eyewear styles loved by our customers.",
}) {
  return (
    <div className="header text-center">
      <span className="tracking-wide py-1 px-2 font-medium rounded-sm text-white bg-blue-500 text-[11px] lg:text-[13px]">
        {badgeText}
      </span>
      <h2 className="mt-2.5 text-2xl font-semibold md:text-4xl lg:text-4xl md:leading-tight">
        {title}
      </h2>
      <p className="mt-3 text-gray-700">{description}</p>
    </div>
  );
}

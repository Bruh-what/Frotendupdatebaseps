import { cva } from "class-variance-authority";

// Define badge styles with variants for type
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-500 text-white hover:bg-blue-400",
        secondary:
          "border-transparent bg-gray-500 text-white hover:bg-gray-400",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-400",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-400",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-400",
        outline: "text-gray-700 border border-gray-500 hover:bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "default", // Default variant is 'default'
    },
  }
);

// Badge component that uses badgeVariants
function Badge({ variant, className, children, ...props }) {
  return (
    <div className={`${badgeVariants({ variant })} ${className}`} {...props}>
      {children}
    </div>
  );
}

// Export the Badge component
export { Badge, badgeVariants };

export const validateForm = (data: {
  fullname: string;
  email: string;
  phone: string;
  city: string;
  postal_code: string;
  address: string;
}): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.fullname) return "Full name is required.";
  if (!data.email) return "Email is required.";
  if (!emailRegex.test(data.email)) return "Invalid email format.";
  if (!data.phone) return "Phone number is required.";
  if (!data.city) return "City is required.";
  if (!data.address) return "Address is required.";

  return null; 
};

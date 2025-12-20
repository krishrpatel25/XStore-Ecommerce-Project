import { toast } from "sonner";


export const customToast = ({ text, icon, color }) => {
  toast(text, {
    icon,
    style: {
      color,
    },
  });
};

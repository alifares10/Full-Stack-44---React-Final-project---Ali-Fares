import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Switch } from "./switch";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const theme = useTheme().theme;

  return (
    <div className="flex justify-center items-center p-1 m-1 ">
      {theme === "dark" ? (
        <div className="flex">
          <Switch
            defaultChecked={theme === "dark"}
            onCheckedChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className=""
          />
          <Moon size={24} />
        </div>
      ) : (
        <div className="flex">
          <Sun size={24} />
          <Switch
            defaultChecked={theme === "dark"}
            onCheckedChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className=""
          />
        </div>
      )}
    </div>
  );
}

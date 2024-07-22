import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";

interface IDone {
  text: string;
  isChecked: boolean;
}

interface IDoneList {
  dones: IDone[];
  handleCheckbox: (index: number, isChecked: boolean) => void;
}

export const DonesList: React.FC<IDoneList> = ({ dones, handleCheckbox }) => {
  return (
    <Card className="w-full md:w-1/2 flex flex-col md:min-h-80">
      <CardHeader>
        <CardTitle >
          Whats Done {dones.length > 0 ? `(${dones.length})` : ""}
        </CardTitle>
      </CardHeader>
      {dones.length > 0 ? 
     <CardContent className={`max-h-44 md:max-h-72 ${dones.length > 3 ? "overflow-y-scroll" : ""} ${dones.length > 5 ? "md:overflow-y-scroll" : ""}`}>
      <ul className="flex flex-col gap-3">
        {dones.map((done, index) => (
          <Card
            className="py-2 px-3 text-lg"
            key={index}
          >
            <s className="flex flex-row justify-between items-center m-0 w-[100%] overflow-hidden">
              {done.text}
              <input
                type="checkbox"
                className="w-[17px] h-[17px]"
                checked={done.isChecked}
                onChange={(e) => handleCheckbox(index, e.target.checked)}
              />
            </s>
          </Card>
        ))}
      </ul>
      </CardContent>  
    : null}
     
    </Card>
  );
};

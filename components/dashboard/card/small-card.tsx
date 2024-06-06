import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card"

interface BigCardProps {
    title: string;
    icon: LucideIcon;
    value: number;
}

export const SmallCard = ({ title, icon: Icon, value }: BigCardProps) => {
    return (
        <Card>
            <CardContent>
                <div className="flex items-center gap-x-3 pt-3">
                    <div className="w-12 h-12 rounded-full bg-primary dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-normal truncate">{title}</p>
                        <p className="text-xl font-bold text-primary">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
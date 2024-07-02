import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Props {
    id: string;
}

export const CopyButton = ({ id }: Props) => {
    const handleClick = () => {
        navigator.clipboard.writeText(`https://www.padmashops.com//quick-order/${id}`)
        toast.success("Link copied")
    }
    return (
        <div className="relative flex justify-start gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={handleClick}>
            <Copy className="w-4 h-4" />
            Copy Quick Link
        </div>
    )
}
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useExitModal } from "@/store/use-exit-modal";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, open, close } = useExitModal();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/mascot_sad.svg" width={80} height={80} alt="Mascot" />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">Wait, don&apos;t go!
                    </DialogTitle>

                </DialogHeader>
                <DialogDescription className="text-center text-base">
                    You&apos;re about to leave the lesson. Are you sure ?
                </DialogDescription>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant="primary" className="w-full" size="lg" onClick={close}>Keep Learning</Button>
                        <Button variant="dangerOutline" className="w-full" size="lg" onClick={()=>{
                            close();
                            router.push("/learn");
                        }}>Keep Learning</Button>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 
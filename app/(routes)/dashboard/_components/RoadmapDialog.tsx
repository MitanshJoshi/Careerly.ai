import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";

const RoadmapDialog = ({
  openDialog,
  setRoadmapDialogOpen,
}: {
  openDialog: boolean;
  setRoadmapDialogOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog  open={openDialog} onOpenChange={setRoadmapDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter position/skills to generate roadmap</DialogTitle>
          <DialogDescription>
                <Input className="mt-2" placeholder="e.g Full Stack Developer"/>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button variant={'outline'}>
                Cancel
            </Button>
            <Button>
                <Sparkle/> Generate Roadmap
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapDialog;

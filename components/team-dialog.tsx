"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TEAM_MEMBERS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TeamDialogProps {
  children: React.ReactNode;
  lang: string;
}

export function TeamDialog({ children, lang }: TeamDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {lang === 'ja' ? 'チームメンバー' : 'Team Members'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6 py-4">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} loading="lazy" />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-semibold">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {member.role[lang as keyof typeof member.role]}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
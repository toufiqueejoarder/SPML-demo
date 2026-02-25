'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';

interface DroneFootageViewerProps {
  projectName: string;
  trigger?: React.ReactNode;
}

export function DroneFootageViewer({ projectName, trigger }: DroneFootageViewerProps) {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return p + 2;
        });
      }, 200);
    }
  };

  const defaultTrigger = (
    <Button className="bg-white/90 text-gray-900 hover:bg-white">
      <Play className="w-4 h-4 mr-2" />
      View Drone Footage
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setIsPlaying(false);
        setProgress(0);
      }
    }}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="relative bg-slate-900">
          <div className="aspect-video relative flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800')] bg-cover bg-center" />
            </div>
            
            <div className="relative z-10 text-center">
              {!isPlaying && progress === 0 && (
                <>
                  <div 
                    className="w-20 h-20 mx-auto mb-4 bg-emerald-600/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-colors"
                    onClick={handlePlayPause}
                  >
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-white text-lg font-semibold">{projectName}</p>
                  <p className="text-slate-300 text-sm">Aerial Drone Survey</p>
                </>
              )}
              
              {isPlaying && (
                <div className="text-white space-y-2">
                  <div className="animate-pulse">
                    <div className="w-16 h-16 mx-auto border-4 border-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">▶</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    Flying over {projectName}...
                  </p>
                  <p className="text-xs text-slate-400">
                    {progress < 30 && 'Capturing entrance and main roads'}
                    {progress >= 30 && progress < 60 && 'Surveying residential plots'}
                    {progress >= 60 && progress < 90 && 'Viewing amenities and green spaces'}
                    {progress >= 90 && 'Final overview shot'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="w-full h-1 bg-slate-600 rounded-full mb-3 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setProgress(Math.max(0, progress - 20))}
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setProgress(Math.min(100, progress + 20))}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <span className="text-white text-xs ml-2">
                  {Math.floor(progress * 1.8)}s / 3:00
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-slate-300 text-xs">HD 1080p</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white">
          <DialogHeader>
            <DialogTitle className="text-slate-900">{projectName} - Aerial Survey</DialogTitle>
            <DialogDescription className="text-slate-600">
              Drone footage captured on site. This is a simulated video player for demo purposes.
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

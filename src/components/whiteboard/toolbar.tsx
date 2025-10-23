'use client'

import { Circle, MousePointer2, Pencil, Square } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Separator } from '@/components/ui/separator'

export type DrawingTool = 'select' | 'pen' | 'circle' | 'rectangle'

interface ToolbarProps {
  selectedTool: DrawingTool
  onToolChange: (tool: DrawingTool) => void
}

export function Toolbar({ selectedTool, onToolChange }: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2 shadow-sm">
      <ToggleGroup type="single" value={selectedTool} onValueChange={(value) => value && onToolChange(value as DrawingTool)}>
        <ToggleGroupItem value="select" aria-label="Select tool">
          <MousePointer2 className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="pen" aria-label="Pen tool">
          <Pencil className="h-4 w-4" />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <ToggleGroupItem value="circle" aria-label="Circle tool">
          <Circle className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="rectangle" aria-label="Rectangle tool">
          <Square className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
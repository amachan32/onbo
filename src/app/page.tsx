import { Whiteboard } from '@/components/whiteboard'

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-8 p-8">
      <h1 className="text-4xl font-bold">onbo - オンラインホワイトボード</h1>
      <Whiteboard />
    </main>
  )
}

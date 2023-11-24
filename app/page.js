import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen grid grid-rows-6 grid-flow-col">
      <div className="row-span-6  bg-red-500">Side Navigations</div>
      <div className="row-span-5 col-span-3 bg-blue-500">Main Content</div>
      <div className="row-span-1 col-span-3 bg-pink-300">Footer</div>
      <div className="row-span-6 bg-green-900">Side COntent</div>
    </main>
  )
}

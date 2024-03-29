import { ChangeEvent, useState } from 'react'
import Logo from './assets/logo-nlw-experts.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'
interface Notes{
  id:string
  date:Date
  content: string
}

export function App() {
  const [search, setSearch]  = useState('')
  const [notes, setNotes] = useState<Notes[]>(()=>{
    const storagedNotes = localStorage.getItem('notes')
    if(storagedNotes){
      return JSON.parse(storagedNotes)
    }
    return []
  })

  function onNoteCreate(content:string){
    const newNote = {
      id:crypto.randomUUID(),
      date:new Date,
      content
    }
   const  notesList = [...notes , newNote ]
   setNotes(notesList)
   localStorage.setItem('notes', JSON.stringify(notesList))
  }
 function onNoteDeleted(id: string){
  const notesArray = notes.filter(note => {
    return note.id !== id
  })
  setNotes(notesArray)
 }
  function handleSearch(event:ChangeEvent<HTMLInputElement> ){
    const query = event.target.value;

    setSearch(query);
  }
  const filterNotes = search !== '' ? notes.filter( note => note.content.toLowerCase().includes(search.toLowerCase())) : notes ;
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 ">
      <img src={Logo} alt='nlw-expert' />
      <form className='w-full '>
        <input
          type='text'
          placeholder='Busquem em suas notas'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
           />
      </form>
      <div className='h-px bg-slate-700' />
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreate={onNoteCreate} />
        {
          filterNotes.map(note => {
            return  <NoteCard key={note.id} note={note} onNotesDeleted={onNoteDeleted}/>
          })
        }
      </div>
    </div>
  )
}


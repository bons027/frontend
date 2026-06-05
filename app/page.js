'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [mahasiswa, setMahasiswa] = useState([])

  useEffect(() => {
    getMahasiswa()
  }, [])

  async function getMahasiswa() {
    const { data, error } = await supabase
      .from('mahasiswa')
      .select('*')
    if (error) {
      console.log('Error fetching data:', error)
    } else {
      setMahasiswa(data)
    }
  }

  // Fungsi untuk menguji INSERT (Tahap 4)
  async function testInsert() {
    const { data, error } = await supabase
      .from('mahasiswa')
      .insert([{ nim: '99999', nama: 'Test Hacker', prodi: 'Hacking' }])

    if (error) {
      alert(`INSERT Gagal (RLS Bekerja!)\nError: ${error.message}`)
      console.log("Error Detail:", error)
    } else {
      alert('INSERT Berhasil (Peringatan: RLS mungkin belum aktif!)')
    }
  }

  return (
    <div className="p-10 font-sans"> 
      <h1 className="text-2xl font-bold mb-6">Data Mahasiswa</h1>      

      <table className="min-w-full border-collapse border border-gray-300 shadow-sm">        
        <thead className="bg-gray-100">          
          <tr>            
            <th className="border border-gray-300 px-4 py-2 text-left">NIM</th>            
            <th className="border border-gray-300 px-4 py-2 text-left">Nama</th>            
            <th className="border border-gray-300 px-4 py-2 text-left">Prodi</th>          
          </tr>        
        </thead>        
        <tbody>        
          {mahasiswa.map((mhs) => (            
            <tr key={mhs.id} className="hover:bg-gray-50">              
              <td className="border border-gray-300 px-4 py-2">{mhs.nim}</td>              
              <td className="border border-gray-300 px-4 py-2">{mhs.nama}</td>              
              <td className="border border-gray-300 px-4 py-2">{mhs.prodi}</td>            
            </tr>          
          ))}        
        </tbody>      
      </table>

      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded">
         <h2 className="text-lg font-bold text-red-700 mb-2">Pengujian Keamanan (Bagian 10)</h2>
         <p className="text-sm mb-4">Klik tombol di bawah ini untuk mencoba melakukan INSERT data. Jika RLS sudah diatur dengan benar (hanya Read-Only), maka proses ini harus gagal.</p>
         <button 
           onClick={testInsert}
           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
         >
           Test Insert Data (Cek RLS)
         </button>
      </div>
    </div> 
  )
}

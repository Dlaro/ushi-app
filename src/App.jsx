import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  const [cattle, setCattle] = useState([])
  const [form, setForm] = useState({
    ushino: '',
    sex: '',
    birthdate: '',
    insemination_date: '',
    memo: ''
  })

  // 🔢 分娩予定日を計算（授精日 + 295日）
  const calcDueDate = (inseminationDateStr) => {
    const date = new Date(inseminationDateStr)
    date.setDate(date.getDate() + 295)
    return date.toISOString().split('T')[0]
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const birth_due_date = calcDueDate(form.insemination_date)
    const { error } = await supabase.from('cattle').insert([
      {
        ushino: form.ushino,
        sex: form.sex,
        birthdate: form.birthdate,
        insemination_date: form.insemination_date,
        birth_due_date,
        memo: form.memo
      }
    ])
    if (error) {
      alert('登録エラー: ' + error.message)
    } else {
      alert('登録完了！')
      setForm({ ushino: '', sex: '', birthdate: '', insemination_date: '', memo: '' })
      fetchData()
    }
  }

  const fetchData = async () => {
    const { data, error } = await supabase.from('cattle').select('*')
    if (!error) setCattle(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>🐮 牛一覧</h1>

      <form onSubmit={handleSubmit}>
        <input name="ushino" placeholder="耳標番号" value={form.ushino} onChange={handleChange} required />
        <input name="sex" placeholder="性別" value={form.sex} onChange={handleChange} required />
        <input name="birthdate" type="date" value={form.birthdate} onChange={handleChange} required />
        <input name="insemination_date" type="date" value={form.insemination_date} onChange={handleChange} required />
        <input name="memo" placeholder="メモ" value={form.memo} onChange={handleChange} />
        <button type="submit">登録</button>
      </form>

      <ul>
        {cattle.map((cow) => (
          <li key={cow.id}>
            <strong>耳標:</strong> {cow.ushino}｜<strong>性別:</strong> {cow.sex}｜<strong>誕生日:</strong> {cow.birthdate}<br />
            🐂 授精日: {cow.insemination_date}｜📅 分娩予定日: {cow.birth_due_date}<br />
            <em>メモ:</em> {cow.memo}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

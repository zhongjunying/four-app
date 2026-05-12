import { revalidatePath } from 'next/cache'
import { neon } from '@neondatabase/serverless'
const sql = neon(`${process.env.DATABASE_URL}`)

export default async function Page() {
  const result = await sql('SELECT * FROM users')
  async function createAction(formData: FormData) {
    'use server'
    const username = formData.get('username')
    const password = formData.get('password')
    await sql('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password])
    revalidatePath('/')
  }
  return (
    <div>
      hello page 01
      <div>
        <form action={createAction}>
          <div>
            用户名：<input className="border" type="text" name="username" />
          </div>
          <div>
            密码：<input className="border" type="text" name="password" />
          </div>
          <button type="submit">注册</button>
        </form>
      </div>
      <ul>
        { result.map(item => <li key={item.id}>{item.username}, {item.password}</li>) }
      </ul>
    </div>
  )
}

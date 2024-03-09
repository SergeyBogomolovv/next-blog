import Header from './header'
import { Card, CardHeader, CardFooter } from '../ui/card'
import BackButton from './back-button'
export default function ErrorCard() {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label='Something went wrong' />
      </CardHeader>
      <CardFooter>
        <BackButton label='Back to login' href='/auth/login' />
      </CardFooter>
    </Card>
  )
}

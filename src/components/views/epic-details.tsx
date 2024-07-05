import { Button } from '~/components/ui'
import { ViewProps } from './types'
import { Header } from '~/components/header'

export function EpicDetailsView(props: ViewProps<'epicDetails'>) {
  return (
    <section>
      <Header title='Epic Details' onGoBack={() => props.onViewSelect('initial')} />

      <Button onClick={() => props.onViewSelect(['output', 'Dekho bhai'])}>Click Me</Button>
    </section>
  )
}

import { ViewProps } from './types'
import { Header } from '../header'
import { Button, Textarea } from '~/components/ui'
import { useState } from 'react'
import { copyToClipboard, sleep } from '~/lib/utils'

export function OutputView(props: ViewProps<'output'>) {
  return (
    <section className='h-full gap-4 pb-4 flex flex-col'>
      <Header title='Output' onGoBack={props.onBack} />
      <div className='px-4 flex-1'>
        <Textarea className='h-full' value={props.data} readOnly />
      </div>
      <CopyButton text={props.data} />
    </section>
  )
}

function CopyButton(props: { text: string }) {
  const [hasCopied, setHasCopied] = useState(false)
  return (
    <Button
      className='mx-4'
      onClick={async () => {
        setHasCopied(true)
        await copyToClipboard(props.text)
        await sleep(2)
        setHasCopied(false)
      }}>
      {hasCopied ? 'Copied' : 'Copy'}
    </Button>
  )
}

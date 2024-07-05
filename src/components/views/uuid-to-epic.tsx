import { resolveText } from '~/lib/utils'
import { Header } from '../header'
import { Button, Textarea } from '../ui'
import { ViewProps } from './types'

export function UuidToEpicView(props: ViewProps<'uuidToEpic'>) {
  return (
    <section className='space-y-8'>
      <Header title='UUID to Epic' onGoBack={() => props.onViewSelect('initial')} />
      <form
        className='space-y-6 px-4'
        onSubmit={async (ev) => {
          ev.preventDefault()
          const fd = new FormData(ev.currentTarget)
          const uuids = (fd.get('uuids') as string).split('\n').filter(Boolean)

          try {
            const epics = await Promise.all(uuids.map(getEpicNumberFromEmployeeUuid))
            let str = ''
            for (let i = 0; i < uuids.length; i++) {
              str += `${uuids[i]},${epics[i] || 'NOT_FOUND'}\n`
            }
            props.onViewSelect(['output', str])
          } catch (error) {
            console.log(error)
          }
        }}>
        <Textarea name='uuids' placeholder='Paste the UUIDs here' />
        <div className='flex justify-end'>
          <Button className='w-32' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </section>
  )
}

async function getEpicNumberFromEmployeeUuid(uuid: string) {
  const doc = await getPageDocument(
    `https://postalbuddy.rajasthan.gov.in/employees?filter_district=&gender=&filter=${uuid}&epicfiltermultiple=`
  )

  const list = doc.querySelector('.overflow-hidden:has(.card>.card-body)')
  const rightItems = list?.children[0]?.querySelector('div > div > div:nth-child(5)')?.children
  const voterEpicNo = rightItems?.item(0)?.lastElementChild?.textContent?.trim()

  return voterEpicNo || null
}

async function getPageDocument(url: string | URL) {
  const htmlPage = await fetch(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-IN,en;q=0.9,hi;q=0.8',
      'upgrade-insecure-requests': '1',
    },
    referrer: 'https://postalbuddy.rajasthan.gov.in/employees',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then(resolveText)

  return new DOMParser().parseFromString(htmlPage, 'text/html')
}

import { FC, useState } from 'react'
import { EpicDetailsView } from '~/components/views/epic-details'
import { InitialView } from '~/components/views/initial'
import { OutputView } from '~/components/views/output'
import { ViewMap, ViewName, ViewProps } from '~/components/views/types'
import { UuidToEpicView } from '~/components/views/uuid-to-epic'

type StateType = {
  [P in keyof ViewMap]: ViewMap[P] extends undefined ? P : [P, ViewMap[P]]
}[keyof ViewMap]

export default function App() {
  const [selectedView, setSelectedView] = useState<StateType[]>([])
  const view = selectedView.at(-1) ?? 'initial'
  const CurrentView = views[typeof view === 'string' ? view : view[0]]

  return (
    <CurrentView
      data={Array.isArray(view) && view[1]}
      onViewSelect={(newView) => setSelectedView((prev) => [...prev, newView])}
      onBack={() => setSelectedView((prev) => prev.toSpliced(-1, 1))}
    />
  )
}

const views: Record<ViewName, FC<ViewProps>> = {
  initial: InitialView,
  uuidToEpic: UuidToEpicView,
  output: OutputView,
  epicDetails: EpicDetailsView,
}

/*
9ba58136-f2f6-4668-b4f4-9aa162244b95
9ba581b0-4655-4bf1-a3c0-fb1381789b07
*/

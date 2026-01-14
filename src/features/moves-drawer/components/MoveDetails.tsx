import type { MoveDetail } from '../../../generated/schemas'
import { MoveTypeBadges } from './MoveTypeBadges'
import { MoveStatsGrid } from './MoveStatsGrid'
import { MoveEffect } from './MoveEffect'
import { MoveDescription } from './MoveDescription'

interface Props {
  moveData: MoveDetail
}

export function MoveDetails(props: Props) {
  return (
    <>
      <MoveTypeBadges typeName={props.moveData.type?.name} damageClassName={props.moveData.damage_class?.name} />

      <MoveStatsGrid
        power={props.moveData.power}
        accuracy={props.moveData.accuracy}
        pp={props.moveData.pp}
        priority={props.moveData.priority}
      />

      <MoveEffect effectEntries={props.moveData.effect_entries} />

      <MoveDescription flavorTextEntries={props.moveData.flavor_text_entries} />
    </>
  )
}

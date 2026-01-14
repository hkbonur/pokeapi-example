interface Props {
  onClose: () => void
}

export function DrawerOverlay(props: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={props.onClose} aria-hidden="true" />
  )
}

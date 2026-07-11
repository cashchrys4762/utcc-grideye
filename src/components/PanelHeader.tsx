interface Props {
  title: string
  subtitle?: string
  center?: boolean
  actions?: React.ReactNode
}

export default function PanelHeader({ title, subtitle, center, actions }: Props) {
  return (
    <div className={`panel-header${center ? ' panel-header--center' : ''}${actions ? ' panel-header--with-actions' : ''}`}>
      <div className="panel-header-text">
        <div className="panel-title">{title}</div>
        {subtitle && <div className="panel-subtitle">{subtitle}</div>}
      </div>
      {actions}
    </div>
  )
}

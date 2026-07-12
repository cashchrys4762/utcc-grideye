import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">{t('notFound.title')}</h1>
      <p className="not-found-desc">{t('notFound.description')}</p>
      <Link to="/" className="not-found-link">{t('notFound.backHome')}</Link>
    </div>
  )
}

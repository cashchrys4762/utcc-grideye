import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <span>{t('footer.copyright', { year })}</span>
      <span className="app-footer-sep">·</span>
      <span>{t('nav.version')}</span>
      <span className="app-footer-sep">·</span>
      <span>{t('footer.region')}</span>
    </footer>
  )
}

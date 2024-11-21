/** @format */

import colors from './colors'

const title = {
  color: colors.textGrey,
  fontWeight: 'bold',
}

const subTitle = {
  fontSize: 20,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: colors.textGrey,
}

const paneWrapper = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  padding: 10,
  borderRadius: 10,
  background: colors.mainWhite,
}

const indentedContent = {
  color: colors.textAccent,
  marginLeft: 12,
}

const roundedBtn = {
  padding: '6px 16px',
  // transform: 'translate3d(0, -6px, 0)',
  border: 'none',
  borderRadius: 10,
  background: colors.textGrey,
  color: colors.mainWhite,
  fontSize: 16,
  fontWeight: 'bold',
  textDecoration: 'none',
}

export default { title, subTitle, paneWrapper, indentedContent, roundedBtn }

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

const form = {
  margin: 10,
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: 8,
}

const formInput = {
  minWidth: 100,
  height: 20,
  flexGrow: 6,
  border: `1px ${colors.textAccent} solid`,
  borderRadius: 10,
  paddingLeft: 8,
  color: colors.textAccent,
}

const formFieldWrapper = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
}

const formLabel = {
  // width: 50,
  flexGrow: 1,
  color: colors.textGrey,
  // textAlign: 'center',
  // background: 'red',
}

export default {
  title,
  subTitle,
  paneWrapper,
  indentedContent,
  roundedBtn,
  form,
  formInput,
  formFieldWrapper,
  formLabel,
}

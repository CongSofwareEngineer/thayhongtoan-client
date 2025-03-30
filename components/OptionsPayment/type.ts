type OptionItemType = {
  name: string
  value: string
  icon?: string
  disabled?: boolean
}

export type OptionPaymentType = {
  listOptions: OptionItemType[]
  onChangeOptions: (param: OptionItemType) => void
  optionSelected: OptionItemType
}

import {
  convertFromWei,
  convertToWei
} from '../../../../../util/converter'

{
  const inputtedData = {}
  const options = document.querySelectorAll('[type=radio]')
  const formConverter = document.querySelector('form')
  const inputs = document.querySelectorAll('.input input')

  const convert = (type, value, option) => {
    const _wei = convertToWei(type, value)
    const inputTypes = document.querySelectorAll(`.inputs.${option} input`);

    [].forEach.call(inputTypes, (type) => {
      if (!value) {
        type.value = ''
        return
      }
      type.value = (type === type.dataset.type) ? value : (convertFromWei(type.dataset.type, _wei))
    })
  }

  [].forEach.call(inputs, (input) => {
    input.addEventListener('keyup', (e) => {
      const target = e.target
      const dataset = target.dataset

      convert(dataset.type, target.value, dataset.option)

      inputtedData.value = target.value
      inputtedData.type = dataset.type
    })
  });

  [].forEach.call(options, (option) => {
    option.addEventListener('change', (e) => {
      const selected = e.target.value
      const formConverterClassList = formConverter.classList
      formConverterClassList.remove('simple', 'extended')
      formConverterClassList.add(selected)

      convert(inputtedData.type, inputtedData.value, selected)
    })
  })
}

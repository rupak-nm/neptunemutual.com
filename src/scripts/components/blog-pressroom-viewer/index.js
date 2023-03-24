import mediumZoom from '../../utils/image-zoom.min'

{
  const images = [
    ...document.querySelectorAll('.blog.pressroom.viewer img')
  ]

  mediumZoom(images)
}

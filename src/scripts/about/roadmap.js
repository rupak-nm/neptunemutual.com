// Container
const container = document.querySelector('.ui.roadmap.container')
const timelineContainer = container.querySelector('.ui.checked.timeline.list')
const storiesContainer = container.querySelector('.ui.story.timeline.list')
// Timeline items
const allTimelineItems = timelineContainer.querySelectorAll('.item[data-slide-index]')
// prev button
const prevBtn = container.querySelector('button#PreviousRoadmapButton')
// next button
const nextBtn = container.querySelector('button#NextRoadmapButton')

const scrollToCenter = (el) => {
  el.parentNode.scrollLeft =
    el.offsetLeft -
    el.parentNode.offsetLeft -
    el.parentNode.offsetWidth / 2 +
    el.offsetWidth / 2
}

const selectStorySlide = (idx) => {
  const matchedStoryItem = storiesContainer.querySelector(`.item[data-slide-index="${idx}"]`)

  if (!matchedStoryItem) {
    throw Error('Invalid selection')
  }

  // Set data-selected to false for all others
  storiesContainer
    .querySelectorAll('.item[data-selected="true"]')
    .forEach(function (el) {
      el.setAttribute('data-selected', 'false')
    })

  // Set data-selected to true for the selected item
  matchedStoryItem.setAttribute('data-selected', 'true')

  // Scroll to selected item
  scrollToCenter(matchedStoryItem)
}

const selectTimelineSlide = (idx) => {
  const matchedTimelineItem = timelineContainer.querySelector(`.item[data-slide-index="${idx}"]`)

  if (!matchedTimelineItem) {
    throw Error('Invalid selection')
  }

  // Set data-selected to false for all others
  timelineContainer
    .querySelectorAll('.item[data-selected="true"]')
    .forEach(function (el) {
      el.setAttribute('data-selected', 'false')
    })

  // Set data-selected to true for the selected item
  matchedTimelineItem.setAttribute('data-selected', 'true')

  // Scroll to selected item
  scrollToCenter(matchedTimelineItem)
}

const updateArrowsState = (selectedIdx) => {
  const itemCount = allTimelineItems.length

  const idx = parseInt(selectedIdx)

  prevBtn.disabled = idx === 0
  nextBtn.disabled = idx === itemCount - 1
}

// Selecting a slide
const selectSlide = (idx) => {
  selectStorySlide(idx)

  selectTimelineSlide(idx)

  updateArrowsState(idx)
}

// After load, add js-enabled class to container
container.classList.add('js-enabled')

// After load, scroll to correct timeline slide and story slide
const currentTimelineSlide = timelineContainer.querySelector('.item.current')

selectSlide(currentTimelineSlide.getAttribute('data-slide-index'))

// Add event listeners to all items
allTimelineItems.forEach(function (el) {
  el.addEventListener('click', function (ev) {
    if (!ev.target) return

    const clickedIndex = this.getAttribute('data-slide-index')

    selectSlide(clickedIndex)
  })
})

// Add event listeners to buttons
prevBtn.addEventListener('click', function () {
  const selectedEl = timelineContainer.querySelector('.item[data-selected="true"]')

  const clickedIndex = selectedEl.getAttribute('data-slide-index')
  selectSlide(parseInt(clickedIndex) - 1)
})

nextBtn.addEventListener('click', function () {
  const selectedEl = timelineContainer.querySelector('.item[data-selected="true"]')

  const clickedIndex = selectedEl.getAttribute('data-slide-index')
  selectSlide(parseInt(clickedIndex) + 1)
})

window.addEventListener('resize', function () {
  const selectedEl = timelineContainer.querySelector('.item[data-selected="true"]')
  const clickedIndex = selectedEl.getAttribute('data-slide-index')
  selectSlide(parseInt(clickedIndex))
})

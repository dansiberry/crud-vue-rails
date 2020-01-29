export let activatedIcons = [];

const setIcon = function(iconUrl) {
  if (iconUrl == 'active') {
    activatedIcons.push(this.id)
  }
}

export const markersStubs = [
    {
      id: 3,
      icon: 'inactive',
      setIcon
    },
    {
      id: 2,
      icon: 'inactive',
      setIcon
    }
]

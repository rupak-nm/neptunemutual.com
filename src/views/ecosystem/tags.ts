interface TagDefinition {
  tags: TagWithHref[]
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
}

const c: TagDefinition = {
  size: 'sm',
  tags: [
    {
      id: 'cover-creators',
      icon: 'folder-plus',
      text: 'Cover Creators',
      slug: 'cover-creators',
      color: 'purple'
    }
  ]
}

const l: TagDefinition = {
  size: 'sm',
  tags: [
    {
      id: 'liquidity-providers',
      icon: 'chart-breakout-square',
      text: 'Liquidity Providers',
      slug: 'liquidity-providers',
      color: 'success'
    }
  ]
}

const p: TagDefinition = {
  size: 'sm',
  tags: [
    {
      id: 'policyholders',
      icon: 'shield-tick',
      text: 'Policyholders',
      slug: 'policyholders',
      color: 'orange'
    }
  ]
}

const all = [c, l, p]

const tags = {
  'cover-creators': c,
  'liquidity-providers': l,
  policyholders: p,
  all
}

export { tags }

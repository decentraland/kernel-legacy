import { SocialModeration } from './moderation'

describe('social.moderation', () => {
  function setup() {
    const inMemory: any = {}
    return new SocialModeration((key: string) => inMemory[key], (key: string, value: any) => (inMemory[key] = value))
  }
  it('works just fine', () => {
    const social = setup()

    const laura = 'laura'
    const john = 'john'
    expect(social.isUserBlocked(laura)).toBeFalsy()
    expect(social.isUserMuted(laura)).toBeFalsy()
    expect(social.isUserBlocked(john)).toBeFalsy()
    expect(social.isUserMuted(john)).toBeFalsy()
    social.muteUser(john)
    expect(social.isUserBlocked(laura)).toBeFalsy()
    expect(social.isUserMuted(laura)).toBeFalsy()
    expect(social.isUserBlocked(john)).toBeFalsy()
    expect(social.isUserMuted(john)).toBeTruthy()
    social.blockUser(laura)
    expect(social.isUserBlocked(laura)).toBeTruthy()
    expect(social.isUserMuted(laura)).toBeFalsy()
    expect(social.isUserBlocked(john)).toBeFalsy()
    expect(social.isUserMuted(john)).toBeTruthy()
    social.unblockUser(john)
    expect(social.isUserBlocked(laura)).toBeTruthy()
    expect(social.isUserMuted(laura)).toBeFalsy()
    expect(social.isUserBlocked(john)).toBeFalsy()
    expect(social.isUserMuted(john)).toBeTruthy()
    social.unblockUser(laura)
    expect(social.isUserBlocked(laura)).toBeFalsy()
    expect(social.isUserMuted(laura)).toBeFalsy()
    expect(social.isUserBlocked(john)).toBeFalsy()
    expect(social.isUserMuted(john)).toBeTruthy()
    social.unmuteUser(john)
    expect(social.isUserBlocked(laura)).toBeFalsy()
    expect(social.isUserMuted(laura)).toBeFalsy()
    expect(social.isUserBlocked(john)).toBeFalsy()
    expect(social.isUserMuted(john)).toBeFalsy()
  })
})

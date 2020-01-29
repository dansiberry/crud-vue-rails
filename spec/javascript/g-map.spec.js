import { shallowMount } from '@vue/test-utils'
import gMap from '../../app/javascript/components/g-map.js';
import { markersStubs, activatedIcons } from './support/g-map.js';

describe("g-map", () => {
  const localThis = {
    googleMarkers: markersStubs,
    highlightPin: 2,
    pinActive: 'active',
    pinInactive: 'inactive',
  }

  it("Updates an icon to active when highlightedPin is given", () => {
    gMap.methods.updatePinIcons.call(localThis);
    expect(activatedIcons).toEqual([2]);
  });
});

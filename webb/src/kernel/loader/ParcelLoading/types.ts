export type ParcelLoadingState = {
  parcelCurrentlyLoading: Record<string, Boolean>
}

export type RootParcelLoadingState = {
  parcelLoading: ParcelLoadingState
}

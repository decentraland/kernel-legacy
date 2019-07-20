# Parametrization, Configuration, and Settings

We have a number of different configuration parameters at different stages.

This package handles the different levels of enforcement for such values in case something crashes.

- **Parametrization** means "a value that is extremely unlikely to change in the same environment". In other words, a *constant from upstream*, be that upstream the communication server, code, or an environmental value. Seldom we have a choice to change this -- or we can only do so at our own peril.
- **Environment**: Production, Staging, Master, CLI Preview, Development, Editor, Builder -- the context in which the client is running.
- **Configuration** is used for "a value that can change in the next run". In other words, a *system setting*. This can be the current Ethereum network, or the current user, the content server that should be used. The most normal example is URL arguments that we use for debugging.
- **Setting** is something that the user might change during the execution of the program.

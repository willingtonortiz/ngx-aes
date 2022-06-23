export class InvalidActionHandlerException extends Error {
  constructor() {
    super(
      `Invalid action handler exception (missing @ActionHandler() decorator?)`
    );
  }
}

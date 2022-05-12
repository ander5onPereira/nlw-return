import { SubmitFeedbackUseCase } from "./submit-feebback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);
describe("Submit feedback", () => {
  it("should be able to submit a fredback", async () => {
    await expect(
      submitFeedback.execute({
        type: "Bug",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,exemplescreenshot",
      })
    ).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it("should not be able to submit a fredback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "exemple comment",
        screenshot: "exemple screenshot",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit a fredback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "Bug",
        comment: "",
        screenshot: "exemple screenshot",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit a fredback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "Bug",
        comment: "exemple comment",
        screenshot: "1234",
      })
    ).rejects.toThrow();
  });
});

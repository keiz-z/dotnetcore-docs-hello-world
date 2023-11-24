using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace dotnetcoresample.Pages;
{
    public class PaymentPageTestModel : PageModel
    {
        // ここにページに関連するプロパティやメソッドを定義します。

        // ページがロードされたときに呼ばれるメソッド
        public void OnGet()
        {
            // ここにページが最初にリクエストされたときのロジックを書きます。
        }

        // 支払いが行われたときに呼ばれるメソッド
        public IActionResult OnPostProcessPayment()
        {
            // ここに支払い処理のロジックを書きます。

            // 支払い処理後にリダイレクトするページを指定
            return RedirectToPage("PaymentSuccess");
        }
    }
}

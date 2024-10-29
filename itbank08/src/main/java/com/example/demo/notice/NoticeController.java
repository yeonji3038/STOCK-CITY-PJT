package com.example.demo.notice;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class NoticeController {
    @Autowired
    private NoticeService service;
    @Autowired
    private HttpSession session;

    @RequestMapping("/notice/noticeform")
    public String noticeForm(Model model,
            @RequestParam(value = "currentPage", required = false) String cp) {
        service.noticeform(cp, model, cp);
        return "/notice/noticeform";
    }

    @RequestMapping("/notice/noticewrite")
    public String noticewrite() {
        String sessionId = (String) session.getAttribute("id");
        if (sessionId == null)
            return "redirect:/";
        return "/notice/noticewrite";
    }

    @PostMapping("/notice/noticewriteProc")
    public String noticewriteProc(MultipartHttpServletRequest multi) {
        String sessionId = (String) session.getAttribute("id");
        if (sessionId == null)

            return "redirect:/";

        String path = service.noticewriteProc(multi);
        return path;
    }

    @RequestMapping("/notice/noticecontent")
    public String noticecontent(String no, Model model) {
        NoticeDTO notice = service.noticecontent(no);

        if (notice == null) {
            return "redirect:/notice/noticeform";
        }

        model.addAttribute("notice", notice);
        return "/notice/noticecontent";
    }

    @RequestMapping("/noticeDownload")
    public void noticeDownload(@RequestParam("no") String no, HttpServletResponse response) throws IOException {
        service.noticeDownload(no, response);
    }

    @RequestMapping("/notice/noticemodify")
    public String noticemodify(String no, Model model) {
        String sessionId = (String) session.getAttribute("id");
        if (sessionId == null)
            // sessionId = "admin";
            return "redirect:/";
        String path = service.noticemodify(no, model);
        return path;
    }

    @PostMapping("/noticemodifyProc")
    public String noticemodifyProc(@RequestParam("no") String no, @RequestParam("title") String title,
            @RequestParam("content") String content,
            RedirectAttributes ra) {
        String sessionId = (String) session.getAttribute("id");
        System.out.println(title);
        System.out.println(content);
        // System.out.println(notice.getFileName());

        if (sessionId == null)
            return "redirect:/";

        NoticeDTO notice = new NoticeDTO();
        notice.setNo(Integer.parseInt(no));
        notice.setContent(content);
        notice.setTitle(title);
        String msg = service.noticemodifyProc(notice);
        ra.addFlashAttribute("msg", msg);

        if (msg.equals("게시글 수정 성공"))
            // return "/notice/noticecontent?no=" + notice.getNo();
            return "redirect:/notice/noticeform";

        return "redirect:/noticemodify?no=" + notice.getNo();
    }

    @RequestMapping("/noticedeleteProc")
    public String noticedeleteProc(@RequestParam("no") String no, RedirectAttributes ra) {
        String sessionId = (String) session.getAttribute("id");
        if (sessionId == null) {
            return "redirect:/";
        }

        String msg = service.noticedeleteProc(no);

        if (msg.equals("작성자만 삭제 할 수 있습니다.")) {
            ra.addFlashAttribute("msg", msg);
            return "redirect:/notice/noticecontent?no=" + no;
        }

        ra.addFlashAttribute("msg", "게시글 삭제 완료");
        return "redirect:/notice/noticeform";
    }

    // @RequestMapping("/noticedeleteProc")
    // public String noticedeleteProc(String no) {
    // String sessionId = (String) session.getAttribute("id");
    // if (sessionId == null)
    // // sessionId = "admin";
    // return "redirect:/";

    // String msg = service.noticedeleteProc(no);

    // if (msg.equals("작성자만 삭제 할 수 있습니다."))
    // return "redirect:/notice/noticecontent?no=" + no;

    // return "redirect:/notice/noticeForm";
    // }

    // @RequestMapping("/notice/noticewrite")
    // public String noticewrite() {
    // String sessionId = (String) session.getAttribute("id");
    // if (sessionId == null)
    // return "redirect:login";FS
    // // sessionId = "admin";
    // return "/notice/noticeform";
    // }

    // @PostMapping("/notice/noticewriteProc")
    // public String noticewriteProc(MultipartHttpServletRequest multi) {
    // String sessionId = (String) session.getAttribute("id");
    // if (sessionId == null)
    // sessionId = "admin";
    // // return "redirect:login";
    // String path = service.noticewriteProc(multi);
    // return path;
    // }

    @PostMapping("/searchTitle")
    public String searchTitle(NoticeDTO notice, Model model) {
        System.out.println(notice.getTitle());

        List<NoticeDTO> nlist = service.searchTitle(notice);
        model.addAttribute("Notices", nlist);
        System.out.println("확인: " + nlist);
        return "notice/noticeform";
    }

}
